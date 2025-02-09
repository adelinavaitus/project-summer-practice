package com.backend.authentication;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig  extends WebSecurityConfigurerAdapter {

    // Inject UserDetailsServiceImpl for custom authentication logic
    @Autowired
    UserDetailsServiceImpl userDetailsService;

    // Inject custom JWT entry point to handle unauthorized access
    @Autowired
    private AuthEntryPointJwt unauthorizedHandler ;

    // Bean to configure the JWT authentication filter
    @Bean
    public AuthTokenFilter authenticationJwtTokenFilter() {
        return new AuthTokenFilter();
    }

    // Configure AuthenticationManagerBuilder with custom userDetailsService and password encoder
    @Override
    protected void configure(final AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder());
    }

    // Bean for BCryptPasswordEncoder to encode passwords
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // Configure HTTP security to disable CSRF, enable CORS, and handle JWT authentication
    @Override
    protected void configure(final HttpSecurity http) throws Exception {

        http.cors().and().csrf().disable()  // Disable CSRF protection and enable CORS
                .exceptionHandling().authenticationEntryPoint(unauthorizedHandler).and()    // Handle unauthorized access
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()   // Stateless authentication
                .authorizeRequests()
                .antMatchers("/login").permitAll()  // Allow public access to login
                .antMatchers("/register-student").permitAll()   // Allow public access to student registration
                .antMatchers("/register-company").permitAll()    // Allow public access to company registration
                .antMatchers("/faculties").permitAll()  // Allow public access to faculties
                .antMatchers("/**").permitAll() // Allow public access to all endpoints
                .anyRequest().authenticated();   // All other requests require authentication

        // Add the JWT filter before the UsernamePasswordAuthenticationFilter
        http.addFilterBefore(authenticationJwtTokenFilter(),UsernamePasswordAuthenticationFilter.class);
    }

    // Bean for AuthenticationManager
    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }
}
