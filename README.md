# index-investor
## Alexa skill for stock market progress  

## Inspiration
Everyone can benefit from a basic familiarity with financial markets.  As the markets move on a daily basis, a quick voice interaction is the ideal way to stay updated. Lots of media outlets report the daily change in the Dow, so I wanted to provide Index Investor users with additional insight.  The skill differentiates itself through its presentation of meaningful percentage comparisons across a variety of time periods.  The experience is further enhanced on Alexa devices with screens by chart visualizations. 

## What it does
The skill is designed to respond to "one-shot" requests from the user, rather than lengthy dialogue.  Simply launching the skill will return data for the S&P 500, providing the most recent close and comparisons against other periods.  Alternatively, the user can ask for the Dow Jones Industrial Average or the Nasdaq.  Users with screen devices will also see a chart that shows the performance of the index over the last year or since the all-time high.

## How I built it
AWS Cloudwatch cron alarms fire daily at 4:05pm ET to trigger a Python Lambda function that retrieves data and creates charts.  The data is stored in a PostgresSQL database provisioned using AWS Relational Database Service.  The Alexa skill, itself, is a Node.js Lambda function.  The skill reads from the database and calculates the movement of the stock in percentage terms over several time periods.  Additionally, the skill determines whether the device has a screen.  Using an Alexa Presentation Language template, the skill presents a chart visualization and change metrics in a format appropriate for the screen shape. 

## Challenges I ran into
I spent some time figuring out how to get my needed Python packages into the Lambda environment.  At first, I had my entire Python project in a large zip file.  I was pleased to learn that I could create a Lambda Layer that stores the packages on S3.  Now, I will be able to leverage this same Layer on future projects with similar requirements. 

## Accomplishments that I'm proud of
I am happy that I learned the Alexa Presentation Language.  It allows an incredible amount of design flexibility.  I am now confident that I can create engaging screen experiences that complement the voice user interface.

## What I learned
As a result of this Hackathon, I am better skilled with a variety of AWS services.  I also feel that my data visualization abilities have improved.  Prior to this competition, my Index Investor skill was much more limited, with no design for screens and only support for only one index.  This competition has been an incredible learning experience for me.

## What's next for Index Investor
The next feature will be the addition of indexes from around the world, such as the FTSE, DAX, CAC, Nikkei, and Shanghai indexes.