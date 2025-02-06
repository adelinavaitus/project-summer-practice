package com.backend.user.categories;

import com.backend.company.Company;
import com.backend.user.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserCompany {
    private User user;
    private Company company;
}
