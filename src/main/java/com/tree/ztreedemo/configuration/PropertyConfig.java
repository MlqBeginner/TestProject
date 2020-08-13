package com.tree.ztreedemo.configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.ImportResource;
import org.springframework.context.annotation.PropertySource;

@Configuration
@PropertySource(ignoreResourceNotFound = true, value = {"classpath:config/core-settings.properties"})
public class PropertyConfig {
}
