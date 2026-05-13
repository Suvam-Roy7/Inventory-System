package com.inventory.OrderService.Configurations;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.servers.Server;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;

@Configuration
public class OpenApiConfig {
	
	// Name used by Swagger UI for the scheme (must match in SecurityRequirement)
    private static final String SECURITY_SCHEME_NAME = "bearerAuth";
	
	@Bean
    public OpenAPI customOpenAPI() {
        Server gatewayServer = new Server();
        gatewayServer.setUrl("http://localhost:7000");
        gatewayServer.setDescription("Gateway URL");

        return new OpenAPI()
                .info(new Info().title("OrderService API").version("v1"))
                .servers(List.of(gatewayServer))

             // 👇 Add a global security requirement so the Authorize button applies to all operations
                             .addSecurityItem(new SecurityRequirement().addList(SECURITY_SCHEME_NAME))
                             // 👇 Define the Bearer JWT scheme
                             .components(new Components()
                                     .addSecuritySchemes(SECURITY_SCHEME_NAME,
                                             new SecurityScheme()
                                                     .name(SECURITY_SCHEME_NAME)
                                                     .type(SecurityScheme.Type.HTTP)
                                                     .scheme("bearer")
                                                     .bearerFormat("JWT")));

    }


}
