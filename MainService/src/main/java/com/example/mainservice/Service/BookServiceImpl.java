package com.example.mainservice.Service;
import com.example.mainservice.Dao.BookDao;
import com.example.mainservice.entity.Book;
import com.example.mainservice.model.HadoopMR;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.example.mainservice.model.SparkIntegration.wordCount;
import static com.example.mainservice.model.HadoopMR.HadoopWordCount;

@Service
public class BookServiceImpl implements BookService{
    @Autowired
    private BookDao bookDao;
    @Override
    public String changeToBase64(String image) {
        return bookDao.changeToBase64(image);
    }
    @Override
    public void addBook(Book book){
        bookDao.addBook(book);
    }
    @Override
    public void delBook(Long bookId){
        bookDao.delBook(bookId);
    }
    @Override
    public List<Book> findAll(){
        return bookDao.findAll();
    }
    @Override
    public Book findBookById(Long bookId) throws JsonProcessingException {
        return bookDao.findBookById(bookId);
    }
    @Override
    public void setQuantity(Long bookId,Long quantity){
        bookDao.setQuantity(bookId,quantity);
    }
    @Override
    public void updateBook(Long bookId, Book book) throws JsonProcessingException {
        bookDao.updateBook( bookId, book);
    }
    @Override
    public List<Book> findBooksByTagRelation(String tagName) throws JsonProcessingException {
        return bookDao.findBooksByTagRelation(tagName);
    }
    @Override
    public Book findBookByName(String name){
        return bookDao.findBookByName(name);
    }
    @Override
    public Map<String, Integer> getBookWordCount(){
       List<Book>books  = bookDao.findAll();
        // 用于保存每个tag对应的描述内容
        Map<String, StringBuilder> tagDescriptions = new HashMap<>();
        for (Book book : books) {
            String tag = book.getTag();
            String description = book.getDescription();
            // 根据tag获取或创建StringBuilder对象
            StringBuilder sb = tagDescriptions.computeIfAbsent(tag, k -> new StringBuilder());
            // 将description添加到相应的StringBuilder对象中
            sb.append(description).append("\n");
        }
        // 将每个tag对应的描述内容写入文件
        for (Map.Entry<String, StringBuilder> entry : tagDescriptions.entrySet()) {
            String tag = entry.getKey();
            String filePath = "D:\\PythonProjects\\se3353_25_spark_python\\input2\\" + tag + ".txt";

            try (BufferedWriter writer = new BufferedWriter(new FileWriter(new File(filePath)))) {
                writer.write(entry.getValue().toString());
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        wordCount();
        String filePath = "D:\\PythonProjects\\se3353_25_spark_python\\output2\\part-00001";
        Map<String, Integer> resultMap = new HashMap<>();

        try (BufferedReader reader = new BufferedReader(new FileReader(filePath))) {
            String line;
            while ((line = reader.readLine()) != null) {
                // 假设文件的每一行格式为 ('code', 7) 这样的形式
                // 使用简单的字符串操作来提取tag和对应的计数值
                int startIndex = line.indexOf('(') + 1;
                int commaIndex = line.indexOf(',');
                int endIndex = line.indexOf(')');

                if (startIndex != -1 && commaIndex != -1 && endIndex != -1) {
                    String tag = line.substring(startIndex, commaIndex).trim().replace("'", "");
                    int count = Integer.parseInt(line.substring(commaIndex + 1, endIndex).trim());

                    resultMap.put(tag, count);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return resultMap;



    }
    @Override
    public Map<String, Integer> getBookWordCountHadoop() throws Exception {
        List<Book>books  = bookDao.findAll();
        // 用于保存每个tag对应的描述内容
        Map<String, StringBuilder> tagDescriptions = new HashMap<>();
        for (Book book : books) {
            String tag = book.getTag();
            String description = book.getDescription();
            // 根据tag获取或创建StringBuilder对象
            StringBuilder sb = tagDescriptions.computeIfAbsent(tag, k -> new StringBuilder());
            // 将description添加到相应的StringBuilder对象中
            sb.append(description).append("\n");
        }
        // 将每个tag对应的描述内容写入文件
        for (Map.Entry<String, StringBuilder> entry : tagDescriptions.entrySet()) {
            String tag = entry.getKey();
            String filePath = "D:\\PythonProjects\\se3353_25_spark_python\\input2\\" + tag + ".txt";

            try (BufferedWriter writer = new BufferedWriter(new FileWriter(new File(filePath)))) {
                writer.write(entry.getValue().toString());
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        int done  = HadoopWordCount();
        String filePath ="D:\\IJProject\\mybookstore\\MainService\\src\\main\\java\\com\\example\\mainservice\\files\\output1\\part-r-00000";
        Map<String, Integer> resultMap = new HashMap<>();

        try (BufferedReader reader = new BufferedReader(new FileReader(filePath))) {
            String line;
            while ((line = reader.readLine()) != null) {
                // 假设文件的每一行格式为 ('code', 7) 这样的形式
                // 使用简单的字符串操作来提取tag和对应的计数值
                String[] parts = line.split("\t"); // 使用制表符'\t'分割字符串
                if (parts.length == 2) {
                    String key = parts[0].trim();
                    int value = Integer.parseInt(parts[1].trim());
                    resultMap.put(key, value);
                } else {
                    System.err.println("Invalid line format: " + line);
                }

            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return resultMap;

    }


}
