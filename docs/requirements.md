# Requirements

## Roleplaying management tool

### 1. Preface

Will be implemented an usable prototype of Roleplaying management tool specifically for Ars Magica:tm: -roleplaying game. Users must be able to create, read, update and delete (CRUD) Character- and Covenant- (player characters residences) sheets. Front-end design will be flexible and scalable for laptops and hand held devices.

### 2. Description

Managing old-school tabletop roleplaying game is, while fun and rewarding, sometimes frustrating labour with lots of paperwork; updating all changing campaign data, lost or ruined (by extensive use of eraser) character sheets or other resources, not to even mention scheduling playing sessions. Old friends in gaming all 'grow up', move to other cities, even other countries, get married and have kids. Understandably getting everybody around the same table, at the same time, is probably the most demanding of all the duties of Game Master.

Roleplaying management tool tries to solve this particular issue by enabling to run gaming sessions remotely, only with aid with a communication channel like Discord or similar, just like pc-players do in multiplayer games. RPMT also solves the problems with manual labour by managing all the paperwork by putting all the necessary information under few clear tabs, where users can find easily their requested information. Also there will never be lost or scruffy character sheets ever again!

### 2. Functional requirements

|Priority|Feature|Description|
|--|--|--|
|P1|Character sheet view|Players must be able to view and update their Character data effortlessly|
|P1|Menu|Swiping and searching between Character data sheets must be intuitively approachable|
|P2|Menu|Switching between Game Master's views (campaigns, quests, covenants, characters) must function effortlessly|
|P2|Overall User interface|Views must be aesthetically pleasing|
|P3|Campaign pool|Pool for users to share their created Campaigns and contents|
|P4|Hex sheet|Implemented real-time hex-sheet to manage combat situations|

### 3. Non-functional requirements

|Requirement ID|Description|
|--|--|
|SEC-REQ-001|Only authorized users can manage Campaign data|
|USABILITY-REQ-001|Campaign creator can share permissions to players to manage campaign data|

### Example cases

*edit this as use cases*

1. Game master needs to check Player Character awareness stat to solve if character can be aware of something happening in her surroundings.
2. Game Master needs to handle another Character (sheet) for the Player.
3. Player need to update his character sheet in-combat or between quests (consuming experience points).