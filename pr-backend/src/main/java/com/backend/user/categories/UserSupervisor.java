package com.backend.user.categories;

import com.backend.supervisor.Supervisor;
import com.backend.user.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserSupervisor {
    private User user;
    private Supervisor supervisor;
}
