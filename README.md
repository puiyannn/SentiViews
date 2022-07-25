# SentiViews
A product recommendation system based on Aspect-Based Sentiment Analysis (ABSA) on customer reviews.


## Description
SentiViews is a web application that provides product recommendation based on Aspect-Based Sentiment Analysis (ABSA) on customer reviews. Keyword extraction will first be performed on customer reviews dataset to identify various aspects or product benefits highly relevant to different categories of products. Then, VADER sentiment analyzer is used to perform sentiment analysis on customer reviews to determine the polarity of different sentiments expressed towards different aspects of a product. Products are then being recommended to users based on the aspect-level sentiment scores. On top of that, the recommender system is further enriched by the implementation of Association Rule Mining in finding out the products frequently viewed together by system users, and recommendation will be provided to users based on the discovered patterns.

## Built With
- React
- React Router
- Material UI
- Styled Components
- Flask
- MongoDB
- MongoEngine

## Screenshots
### Ranking of Products based on Sentiment Score

![image](https://user-images.githubusercontent.com/57149197/180818371-2ef0a565-0376-4108-9f0b-d3254ce930de.png)

### Individual Product Page
Visualization and detailed information on the result of aspect-based sentiment analysis on customer reviews are provided.
Products under "You May Also Like" section are the products discovered to be frequently viewed together by system users. Association Rule Mining is implemented to discover the patterns.

![image](https://user-images.githubusercontent.com/57149197/180820522-c012a6d0-be50-4c87-8b70-d199a5e1fae5.png)


### Product Comparison

![image](https://user-images.githubusercontent.com/57149197/180819159-56a383b9-e992-4fb7-83bb-a161a374c181.png)

## Video (Concepts & Demo)
[![image](https://user-images.githubusercontent.com/57149197/180822228-05b4998a-d636-4f9f-ad5e-df1d11df8be3.png)](https://www.youtube.com/watch?v=-OgwO6KLCEw)


