package com.ecej.cc.v1.demo;

import org.apache.commons.io.IOUtils;
import org.apache.http.HttpEntity;
import org.apache.http.NameValuePair;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.utils.URIBuilder;
import org.apache.http.conn.ssl.SSLConnectionSocketFactory;
import org.apache.http.conn.ssl.TrustSelfSignedStrategy;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.impl.conn.PoolingHttpClientConnectionManager;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.ssl.SSLContexts;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.util.ObjectUtils;
import org.springframework.util.StringUtils;

import javax.net.ssl.SSLContext;
import java.io.IOException;
import java.io.InputStream;
import java.net.URI;
import java.nio.charset.Charset;
import java.security.KeyManagementException;
import java.security.KeyStoreException;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @Description: httpClient封装
 * @author fengli
 * @date 2017年5月22日 上午11:38:41
 *
 */
public class HttpClientUtil
{
    
    private static Logger LOGGER = LoggerFactory.getLogger(HttpClientUtil.class);
    
    private static PoolingHttpClientConnectionManager connMgr;
    private static RequestConfig requestConfig;
    private static final int MAX_TOTAL = 50; // 100->50
    private static final int CONNECT_TIMEOUT = 4000;
    private static final int SOCKET_TIMEOUT = 4000;
    private static final String CHARSET = "UTF-8";
    
    static
    {
        // 设置连接池
        connMgr = new PoolingHttpClientConnectionManager();
        // 设置连接池大小
        connMgr.setMaxTotal(MAX_TOTAL);
        connMgr.setDefaultMaxPerRoute(MAX_TOTAL);
        
        RequestConfig.Builder configBuilder = RequestConfig.custom();
        // 设置连接超时
        configBuilder.setConnectTimeout(CONNECT_TIMEOUT);
        // 设置读取超时
        configBuilder.setSocketTimeout(SOCKET_TIMEOUT);
        LOGGER.debug("Http参数设置,连接超时时间[{}],Socket超时时间[{}],请求超时时间[{}]", CONNECT_TIMEOUT, SOCKET_TIMEOUT);
        requestConfig = configBuilder.build();
    }
    
    /**
     * 设置连接超时和请求超时
     * 
     * @param connect_timout
     *            连接超时
     * @param max_timeout
     *            请求超时
     */
    public static void setHttpParam(int connect_timout, int max_timeout)
    {
        
        RequestConfig.Builder configBuilder = RequestConfig.custom();
        configBuilder.setConnectTimeout(connect_timout);
        configBuilder.setSocketTimeout(max_timeout);
        configBuilder.setConnectionRequestTimeout(max_timeout);
        LOGGER.debug("Http参数自定义设置,连接超时时间[{}],Socket超时时间[{}],请求超时时间[{}]", connect_timout, SOCKET_TIMEOUT, max_timeout);
        requestConfig = configBuilder.build();
    }
    
    /**
     * 发送 GET 请求（HTTP），不带输入数据
     *
     * @param url
     * @return
     * @throws Exception
     */
    public static String doGet(String url) throws Exception
    {
        
        return doGet(url, new HashMap<String, Object>());
    }
    
    /**
     * 发送 GET 请求（HTTP），K-V形式
     *
     * @param url
     * @param params
     * @return
     * @throws Exception
     */
    public static String doGet(String url, Map<String, Object> params) throws Exception
    {
        return doGet(url, params, CHARSET);
    }
    
    public static String doGet(String url, Map<String, Object> params, String charset) throws Exception
    {
        String result = "";
        CloseableHttpResponse response = null;
        try
        {
            if(StringUtils.isEmpty(url))
            {
                LOGGER.info("warn:doGet url is null or '' ");
                return result;
            }
            response = doGetResponse(url, params, charset);
            if(response == null)
            {
                return result;
            }
            LOGGER.info("doGet statusCode:{}", response.getStatusLine().getStatusCode());
            
            HttpEntity entity = response.getEntity();
            InputStream instream = null;
            if(entity != null)
            {
                instream = entity.getContent();
                result = IOUtils.toString(instream, charset);
            }
        }
        finally
        {
            if(response != null)
            {
                response.close();
            }
        }
        return result;
    }
    
    public static CloseableHttpResponse doGetResponse(String url, Map<String, Object> params, String charset) throws Exception
    {
        if(StringUtils.isEmpty(url))
        {
            LOGGER.info("warn:doGet url is null or '' ");
            return null;
        }
        List<NameValuePair> pairList = new ArrayList<>(params.size());
        for(Map.Entry<String, Object> entry : params.entrySet())
        {
            pairList.add(new BasicNameValuePair(entry.getKey(), entry.getValue().toString()));
        }
        CloseableHttpClient httpclient = HttpClients.custom().setConnectionManager(connMgr).build();
        
        URIBuilder URIBuilder = new URIBuilder(url);
        URIBuilder.setCharset(Charset.forName(StringUtils.isEmpty(charset) ? CHARSET : charset));
        URIBuilder.addParameters(pairList);
        URI uri = URIBuilder.build();
        HttpGet httpGet = new HttpGet(uri);
        CloseableHttpResponse response = httpclient.execute(httpGet);
        return response;
    }
    
    /**
     * 发送 POST 请求（HTTP），不带输入数据
     *
     * @param apiUrl
     * @return
     * @throws Exception
     */
    public static String doPost(String url) throws Exception
    {
        
        return doPost(url, new HashMap<String, Object>());
    }
    
    /**
     * 发送 POST 请求（HTTP），K-V形式
     *
     * @param url
     *            API接口URL
     * @param params
     *            参数map
     * @return
     * @throws Exception
     */
    public static String doPost(String url, Map<String, Object> params) throws Exception
    {
        
        if(StringUtils.isEmpty(url))
        {
            LOGGER.info("warn:doPost url is null or '' ");
            return null;
        }
        List<NameValuePair> pairList = new ArrayList<>(params.size());
        for(Map.Entry<String, Object> entry : params.entrySet())
        {
            Object obj = entry.getValue();
            if (ObjectUtils.isEmpty(obj)){
                obj ="";
            }
            pairList.add(new BasicNameValuePair(entry.getKey(), obj.toString()));
        }
        HttpPost httpPost = new HttpPost(url);
        httpPost.setEntity(new UrlEncodedFormEntity(pairList, Charset.forName(CHARSET)));
        
        return send(httpPost, false);
    }
    
    /**
     * 发送 POST 请求（HTTP），xml
     *
     * @param url
     *            API接口URL
     * @param xml
     *            xml 参数
     * @return
     * @throws Exception
     */
    public static String doPost(String url, String xml) throws Exception
    {
        
        if(StringUtils.isEmpty(url))
        {
            LOGGER.info("warn:doPost url is null or '' ");
            return null;
        }
        
        HttpPost httpPost = new HttpPost(url);
        httpPost.setEntity(new StringEntity(xml, "GBK"));
        return send(httpPost, false);
    }
    
    /**
     * 发送 POST 请求（HTTP），JSON形式
     *
     * @param url
     * @param json
     *            json对象
     * @return
     * @throws Exception
     */
    public static String doPost(String url, Object json) throws Exception
    {
        
        if(StringUtils.isEmpty(url))
        {
            LOGGER.error("warn:doPostByJson url is null or '' ");
            return null;
        }
        HttpPost httpPost = new HttpPost(url);
        StringEntity stringEntity = new StringEntity(json.toString(), CHARSET);
        stringEntity.setContentType("application/json");
        httpPost.setEntity(stringEntity);
        
        return send(httpPost, false);
    }
    
    /**
     * 发送 SSL POST 请求（HTTPS），K-V形式
     *
     * @param apiUrl
     *            API接口URL
     * @param params
     *            参数map
     * @return
     * @throws Exception
     */
    public static String doPostSSL(String apiUrl, Map<String, Object> params) throws Exception
    {
        
        if(StringUtils.isEmpty(apiUrl))
        {
            LOGGER.info("warn:doPostSSL url is null or '' ");
            return null;
        }
        
        List<NameValuePair> pairList = new ArrayList<>(params.size());
        for(Map.Entry<String, Object> entry : params.entrySet())
        {
            NameValuePair pair = new BasicNameValuePair(entry.getKey(), entry.getValue().toString());
            pairList.add(pair);
        }
        HttpPost httpPost = new HttpPost(apiUrl);
        httpPost.setEntity(new UrlEncodedFormEntity(pairList, Charset.forName("utf-8")));
        return send(httpPost, true);
    }
    
    /**
     * 发送 SSL POST 请求（HTTPS），JSON形式
     *
     * @param apiUrl
     *            API接口URL
     * @param json
     *            JSON对象
     * @return
     * @throws Exception
     */
    public static String doPostSSL(String apiUrl, Object json) throws Exception
    {
        
        if(StringUtils.isEmpty(apiUrl))
        {
            LOGGER.info("warn:doPostSSL By Json url is null or '' ");
            return null;
        }
        
        StringEntity stringEntity = new StringEntity(json.toString(), CHARSET);
        HttpPost httpPost = new HttpPost(apiUrl);
        httpPost.setEntity(stringEntity);
        stringEntity.setContentEncoding(CHARSET);
        stringEntity.setContentType("application/json");
        return send(httpPost, true);
    }
    
    /**
     * 发送Post请求
     * 
     * @param httpPost
     * @return
     * @throws IOException
     * @throws ClientProtocolException
     * @throws KeyStoreException
     * @throws NoSuchAlgorithmException
     * @throws KeyManagementException
     */
    private static String send(HttpPost httpPost, boolean isSsl) throws ClientProtocolException, IOException, KeyManagementException, NoSuchAlgorithmException, KeyStoreException
    {
        String result = null;
        CloseableHttpResponse response = null;
        try
        {
            CloseableHttpClient httpClient = null;
            if(isSsl)
            {
                SSLContext sslcontext = SSLContexts.custom().loadTrustMaterial(null, new TrustSelfSignedStrategy()).build();
                SSLConnectionSocketFactory sslsf = new SSLConnectionSocketFactory(sslcontext);
                httpClient = HttpClients.custom().setConnectionManager(connMgr).setSSLSocketFactory(sslsf).setDefaultRequestConfig(requestConfig).build();
            }
            else
            {
                httpClient = HttpClients.custom().setConnectionManager(connMgr).build();
            }
            httpPost.setConfig(requestConfig);
            
            response = httpClient.execute(httpPost);
            
            LOGGER.info("doPost statusCode:{}", response.getStatusLine().getStatusCode());
            HttpEntity entity = response.getEntity();
            
            InputStream instream = null;
            if(entity != null)
            {
                instream = entity.getContent();
                result = IOUtils.toString(instream, CHARSET);
                LOGGER.info("doPost Result:{}", result);
            }
        }
        finally
        {
            if(response != null)
            {
                response.close();
            }
        }
        
        return result;
    }
    
}
