package com.example.mainservice.Repository;

import com.example.mainservice.entity.BookImage;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BookImageRepository extends MongoRepository<BookImage, ObjectId> {
    BookImage findByBookId(Integer bookId);

    void deleteByBookId(int bookId);
}
