// src/main/java/com/collab/collaboration/model/User.java
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(unique = true)
    private String username;
    
    private String password;
    
    // constructors, getters, setters
    public User() {}
    public User(String username, String password) {
        this.username = username;
        this.password = password;
    }
    // ... getters/setters
}
