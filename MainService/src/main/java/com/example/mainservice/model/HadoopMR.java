package com.example.mainservice.model;

import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.io.IntWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Job;
import org.apache.hadoop.mapreduce.Mapper;
import org.apache.hadoop.mapreduce.Reducer;
import org.apache.hadoop.mapreduce.lib.input.FileInputFormat;
import org.apache.hadoop.mapreduce.lib.output.FileOutputFormat;

import org.apache.hadoop.fs.Path;
import java.io.IOException;

import java.util.StringTokenizer;

public class HadoopMR{

    public static class TokenizerMapper
            extends Mapper<Object, Text, Text, IntWritable> {

        private final static IntWritable one = new IntWritable(1);
        private Text word = new Text();

        private final static String[] keywords = {"code", "fiction", "english"};

        public void map(Object key, Text value, Context context
        ) throws IOException, InterruptedException {
            StringTokenizer itr = new StringTokenizer(value.toString());
            while (itr.hasMoreTokens()) {
                String token = itr.nextToken().toLowerCase(); // Convert to lowercase for case-insensitive comparison
                for (String keyword : keywords) {
                    if (token.contains(keyword)) {
                        word.set(keyword);
                        context.write(word, one);
                    }
                }
            }
        }
    }

    public static class IntSumReducer
            extends Reducer<Text, IntWritable, Text, IntWritable> {
        private IntWritable result = new IntWritable();

        public void reduce(Text key, Iterable<IntWritable> values,
                           Context context
        ) throws IOException, InterruptedException {
            int sum = 0;
            for (IntWritable val : values) {
                sum += val.get();
            }
            result.set(sum);
            context.write(key, result);
        }
    }

    public static int HadoopWordCount() throws Exception {
        Configuration conf = new Configuration();
        conf.set("dfs.defaultFS", "hdfs://hadoop:9000");
        Job job = Job.getInstance(conf, "word count");
        int numMapTasks = job.getConfiguration().getInt("mapreduce.job.maps", 1);
        int numReduceTasks = job.getConfiguration().getInt("mapreduce.job.reduces", 1);
        job.setJarByClass(HadoopMR.class);

        // 设置要递归处理的文件夹路径
        FileInputFormat.setInputDirRecursive(job, true);

        job.setMapperClass(TokenizerMapper.class);
        job.setCombinerClass(IntSumReducer.class);
        job.setReducerClass(IntSumReducer.class);
        job.setOutputKeyClass(Text.class);
        job.setOutputValueClass(IntWritable.class);

        FileInputFormat.addInputPath(job, new Path("D:\\PythonProjects\\se3353_25_spark_python\\input2"));  // 修改为实际的输入路径
        //删除"D:\\IJProject\\mybookstore\\MainService\\src\\main\\java\\com\\example\\mainservice\\files\\output1"目录
        Path path = new Path("D:\\IJProject\\mybookstore\\MainService\\src\\main\\java\\com\\example\\mainservice\\files\\output1");
        path.getFileSystem(conf).delete(path, true);

        FileOutputFormat.setOutputPath(job, path);  // 修改为实际的输出路径

        System.out.println("Mapper数量：" + numMapTasks); // 获取Reducer的数量
        System.out.println("Reducer数量：" + numReduceTasks);
//        System.exit(job.waitForCompletion(true) ? 0 : 1);
        return job.waitForCompletion(true) ? 0 : 1;  // 返回作业的状态
    }
}
