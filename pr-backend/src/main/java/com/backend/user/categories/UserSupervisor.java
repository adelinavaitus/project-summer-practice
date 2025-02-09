package com.backend.user.categories;

import com.backend.supervisor.Supervisor;
import com.backend.user.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
// This class represents a DTO used for holding data about a User and a Supervisor
public class UserSupervisor {
    private User user;   // The User associated with the supervisor
    private Supervisor supervisor;  // The Supervisor associated with the user
}