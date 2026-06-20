---------------------------
Country                   |
---------------------------
Purpose:
Represents a sovereign nation

Relationships:
1 Country has many states

Fields:
id
slug
name
code
created_at
udpated_at


----------------------------
      States               |
----------------------------
Purpose:
Represents a state within the Country

Relationships
1 State belongs to 1 Country
1 state has many cities

Fields:
id
country_id (foreign key)
name
slug
created_at
updated_at

-----------------------------
       Cities               |
-----------------------------
Purpose:
Represents a City within the state

Relationships:
1 City belongs to 1 State
1 city has many Destinations
1 city has many Experience
1 city has many Stay Areas
1 city has many Cost Estimates

Fields:
id
state_id (foreign key)
name
slug 
latitude
longitude
best_time_to_visit
ideal_trip_days
description
created_at
updated_at

--------------------------------
       Categories              |
--------------------------------
Purpose:
Represents the type of Tourists destination

Relationships:
1 Category has many destinations

Fields:
id
name
slug
icon
created_at
updated_at

-----------------------------------
       Destinations               |
-----------------------------------
Purpose:
Represents Tourist attraction within a City

Relationships:
1 Destination belongs to 1 City
1 Destination belongs to 1 Category
1 Destination has many Images
1 Destination has many Reviews
1 Destination can be saved by many Users

Fields:
id
city_id (foreign key)
category_id (foreign key)
name
slug
description
entry_fee
visit_duration_minutes
latitude
longitude
is_featured
created_at
updated_at

--------------------------------------
       Destination Images             |
--------------------------------------
Purpose:
Stores Images of the Destinations

Relationships:
1 Destination has many Images

Fields:
id
destination_id (foriegn key)
image_url
caption
display_order
created_at
updated_at

-----------------------------------
       Experiences                |
-----------------------------------
Purpose:
Represents activities travelers can enjoy

Relationships:
1 Experience belongs to 1 city

Fields:
id
city_id (foriegn key)
title
description
duration_minutes
price_min
price_max
created_at
updated_at

---------------------------------
       Stay Areas                |
---------------------------------
Purpose:
Represents a recommended neighborhoods for accommodation

Relationships:
1 Stay Area belongs to 1 City

Fields:
id
city_id
name
budget_type
description
near_transport
family_friendly
created_at
updated_at

---------------------------------
       Travel Routes             |
---------------------------------
Purpose:
Represents travel between two cities

Relationships:
1 City can have many outgoing routes
1 City can have many incoming routes

Fields:
id
source_city_id
destination_city_id
travel_mode
distance_km
travel_time_minutes
cost_min
cost_max
created_at
updated_at

---------------------------------
       Cost Estimates           |
---------------------------------
Purpose:
Represents approximate travel expenses

Relationships:
1 City has many Cost Estimates

Fields:
id
city_id (foreign key)
budget_type
stay_cost
food_cost
transport_cost
activity_cost
miscellaneous_cost
created_at
updated_at

-----------------------------
       Users                |
-----------------------------
Purpose:
Represents a registered traveler

Relationships:
1 User has many Favorites
1 User has many Reviews

Fields:
id
name
email
password_hash
avatar_url
created_at
updated_at

--------------------------------
       Favorites                |
--------------------------------
Purpose:
Stores bookmarked destination

Relationships
1 Favorite belongs to 1 User
1 Favorite belongs to 1 Destination

Fields:
id
user_id (foreign key)
destination_id (foreign key)
created_at

------------------------------
       Reviews                |
------------------------------
Purpose:
Stores Destination Reviews

Relationships:
1 Review belongs to 1 User
1 Review belongs to 1 Destination

Fields:
id
user_id (foreign key)
destination_id (foreign key)
rating
comment
created_at
updated_at

---------------------------
       Tags               |
---------------------------
Purpose:
Represents the type of destination

Relationships:
1 Tag belongs to many Destinations
1 Destination has many Tags

Fields:
id
name
slug
icon
created_at
updated_at

--------------------------------------
       DestinationTags               |
--------------------------------------
Purpose:
Maps destinations to Tags

Relationships:
1 DestinationTag belongs to 1 Destination
1 DestinationTag belongs to 1 Tag

Fields:
created_at
tag_id (foreign key)
destination_id (foreign key)
primary key -> (tag_id, destination_id)

-------------------------------------
       Operating Hours               |
-------------------------------------
Purpose:
Represents opening and closing timings of a destination

Relationships:
1 Destination has many Operating Hours

Fields:
id
destination_id (foreign key)
day_of_week
open_time
close_time
is_closed
created_at
updated_at

--------------------------
        Facilities       |
--------------------------
Purpose:
Represents the facilities provided in the Destination

Relationships:
1 Destination has many Facilities
1 Facility belongs to many Destination

Fields:
id
name
slug
icon
created_at
updated_at

--------------------------------------
        Destination Facilities       |
--------------------------------------
Purpose:
Maps facilities to Destinations

Fields:
destination_id (foreign key)
facility_id (foreign key)
created_at
primary key -> (destination_id, facility_id)

Future Table (not implemented yet)
1. Video (Reels)
2. CommunityPost
3. Comment
4. Itinerary
5. AIRecommendation
6. TravelPlan
7. Notification
8. TravelHistory

