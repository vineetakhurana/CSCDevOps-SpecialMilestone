# CSCDevOps-SpecialMilestone

###Project Group Members :

Vineeta Khurana (vkhuran2)

Satvik Andi (sandi)

###Link to video:

###Special Milestone:

The special milestone introduces resilience testing via a chaos monkey. This is an add-on to the project deployed in Milestone 3. (github link)

The following are the features in the milestone:
- 5 EC2 instances have been configured using AWS CloudFormation.
- The 5 EC2 instances have the production app running on them.
- The app running on the instances is: *'app.js'* (github link)
- Each of these 5 instances are equally potential targets in a list of targets for a proxy to choose from. 
- There is a proxy on my local machine, listening at port 3000. This proxy selects one of the instances in a round-robin fashion, from the list of available instances i.e. potential targets at any given time.
- The Chaos Monkey, is designed to bring down random instances at random intervals of time. 
- The removeServer() function will remove a particular EC2 instance from the list of potential targets as per time interval.
- The addServer() function is designed to arbitrarily add one of the instances removed by chaos monkey to be added back as a potential target.
- This list is refreshed based on removed and added instances and hence the proxy will always have atleast 1 EC2 instance to use as a target.
- 

