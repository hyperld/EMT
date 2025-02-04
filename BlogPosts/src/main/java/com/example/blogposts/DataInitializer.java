package com.example.blogposts;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;
import java.util.List;

@Component
public class DataInitializer {
    @Bean
    CommandLineRunner initData(UserRepository userRepository, PostRepository postRepository, ReplyRepository replyRepository) {
        return args -> {
            User user1 = new User(null, "john_doe", "password123");
            User user2 = new User(null, "jane_doe", "password123");
            userRepository.saveAll(List.of(user1, user2));

            Post post1 = new Post(null, "Hello World!", null, user1, null);
            postRepository.save(post1);

            Reply reply1 = new Reply(null, "Nice post!", user2, post1);
            replyRepository.save(reply1);
        };
    }
}
