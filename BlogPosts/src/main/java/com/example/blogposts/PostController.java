package com.example.blogposts;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/posts")
@CrossOrigin("http://localhost:3000")

public class PostController {
    private final PostRepository postRepository;
    private final ReplyRepository replyRepository;

    public PostController(PostRepository postRepository, ReplyRepository replyRepository) {
        this.postRepository = postRepository;
        this.replyRepository = replyRepository;
    }

    @GetMapping
    public List<Post> getPosts() {
        return postRepository.findAll();
    }

    @PostMapping
    public Post createPost(@RequestBody Post post) {
        return postRepository.save(post);
    }

    @PostMapping("/{postId}/reply")
    public Reply replyToPost(@PathVariable Long postId, @RequestBody Reply reply) {
        Post post = postRepository.findById(postId).orElseThrow(() -> new RuntimeException("Post not found"));
        reply.setPost(post);
        return replyRepository.save(reply);
    }

    @DeleteMapping("/{postId}/delete/{userId}")
    public void deletePost(@PathVariable Long postId, @PathVariable Long userId) {
        Post post = postRepository.findById(postId).orElseThrow(() -> new RuntimeException("Post not found"));
        if (!post.getUser().getId().equals(userId)) {
            throw new RuntimeException("Unauthorized to delete this post");
        }
        postRepository.delete(post);
    }
}


