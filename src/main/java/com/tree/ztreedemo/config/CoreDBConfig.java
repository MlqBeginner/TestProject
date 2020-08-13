package com.tree.ztreedemo.config;

import com.alibaba.druid.filter.Filter;
import com.alibaba.druid.pool.DruidDataSource;
import com.alibaba.druid.wall.WallConfig;
import com.alibaba.druid.wall.WallFilter;
import org.apache.ibatis.session.SqlSessionFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import java.sql.SQLException;
import java.util.List;

@Configuration
@EnableTransactionManagement
public class CoreDBConfig extends AbstractDruidDBConfig {

    @Value("${wlkjs.datasource.url}")
    private String url;

    @Value("${wlkjs.datasource.username}")
    private String username;

    @Value("${wlkjs.datasource.password}")
    private String password;

    // 注册dataSource
    @Bean(name = "zTreeDataSource", initMethod = "init", destroyMethod = "close")
    @Primary
    public DruidDataSource dataSource() {
        //ceshi
        DruidDataSource dataSource = super.createDataSource(url, username, password);
        List<Filter> filters = dataSource.getProxyFilters();
        WallFilter filter = (WallFilter) filters.get(2);
        WallConfig wallConfig = new WallConfig();
        wallConfig.setMultiStatementAllow(true);
        filter.setConfig(wallConfig);
        dataSource.setProxyFilters(filters);
        return dataSource;
    }

    @Bean(name = "zTreeSqlSessionFactory")
    @Primary
    public SqlSessionFactory sqlSessionFactory() throws Exception {
        return super.sqlSessionFactory(dataSource());
    }

    @Bean
    @Primary
    public PlatformTransactionManager transactionManager() throws SQLException {
        return new DataSourceTransactionManager(dataSource());
    }


}
