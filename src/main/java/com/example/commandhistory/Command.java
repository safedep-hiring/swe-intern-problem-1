package com.example.commandhistory;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "commands")
public class Command extends PanacheEntity {
    public String command;
    public LocalDateTime timestamp;

    public Command() {
        this.timestamp = LocalDateTime.now();
    }

    // Custom finder method
    public static List<Command> findByKeyword(String keyword) {
        return find("command LIKE ?1", "%" + keyword + "%").list();
    }
}
