---
sidebar_position: 2
---
# Installation 
These instructions will guide you through the installation and setup of the KosmaPanel.
Before starting the installation, make sure you have the following prerequisites:

| Requirement | Minimum | Recommended | 
| - | - | - |
| OS | Debian >= 10 | Ubuntu >= 20.04 |
| Ram | 2GB | 4GB |
| Disk | 5GB | 12GB |
| Cores | 1 | 4 |

### Step 1: Install Dependencies
Install the required dependencies by running the following commands:
```bash
su root
apt update
apt upgrade -y
apt install wget curl sudo -y
```

### Step 2: Run our installer
The installer will help you fill in all the required information to install our panel. 
```bash
curl -sS https://raw.githubusercontent.com/MythicalLTD/KosmaPanel/main/installer/install.sh -o install.sh
sudo chmod u+x install.sh
sudo bash install.sh
```

### Step 3: Access the WebPanel
After you are done using our installer, you can view your panel at `https://webpanel.yourdomain.com/`
