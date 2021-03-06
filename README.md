# CSCDevOps-SpecialMilestone

###Project Group Members :

Vineeta Khurana (vkhuran2)

Satvik Andi (sandi)

###Link to video: 

https://www.youtube.com/watch?v=f7ZKxcoXRsI

###Special Milestone:

The special milestone introduces resilience testing via a chaos monkey. This is an add-on to the project deployed in Milestone 3. (https://github.com/satvikandi/Hello)

The following are the features in the milestone:
- 5 EC2 instances have been configured using AWS CloudFormation. 

![ec2_running_instances] [ec2_running_instances]

- The 5 EC2 instances have the production app running on them.
- The app running on the instances is: *'app.js'* . It is deployed similar to deployment scheme used in Milestone 3. 
    
![ec2app_running] [ec2app_running]

- Each of these 5 instances are equally potential targets in a list of targets for a proxy to choose from. 
- There is a proxy on my local machine, listening at port 3000. This proxy selects one of the instances in a round-robin fashion, from the list of available instances i.e. potential targets at any given time. 

![appjs_onlocal] [appjs_onlocal]

- The Chaos Monkey, is designed to bring down random instances at random intervals of time. 
- The removeServer() function, implements chaos monkey and will remove a particular EC2 instance from the list of potential targets as per time interval.
- The addServer() function is designed to arbitrarily add one of the instances removed by chaos monkey to be added back as a potential target.
- This list is refreshed based on removed and added instances and hence the proxy will always have atleast one EC2 instance to use as a target. 
- There is an additional app listening on port 3002. This app shows the list of servers available as potential targets to the proxy along with timestamp. 

![3002_1] [3002_1]

![3002_2] [3002_2]

![3002_3] [3002_3]

![3002_4] [3002_4]



[ec2_running_instances]: /images/ec2_production_instances.PNG
[ec2app_running]: /images/ec2_apprunning.PNG
[appjs_onlocal]: /images/appjs_onlocal.PNG
[3002_1]: /images/3002_1.PNG
[3002_2]: /images/3002_2.PNG
[3002_3]: /images/3002_3.PNG
[3002_4]: /images/3002_4.PNG
