package com.backend.user.categories;

import com.backend.company.Company;
import com.backend.user.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
// This class is a DTO (Data Transfer Object) used to hold the relationship between a User and a Company
public class UserCompany {
    private User user;  // The User associated with the company
    private Company company;    // The Company associated with the user
}