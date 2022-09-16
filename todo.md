# TODO Bandcamper

## Frontend

- Mock 3 different watches on sidebar
- Mock Settings page (change username, show email)
- Mock registration page (username, password, email, bandcamp page to fetch releases from all favorite artists)
- Mock login page (username, password)
- Mock Inbox

## Backend

- Install and configure postfix (locally)
- Install and configure PostgreSQL (locally)
- Configure / create virtual users for Postfix
- Registration logic:
  1. Create new user in users database
  2. Create new virtual user in emails database
- Expose API for:
  1. Get all new releases
  2. Get all new unseen releases
  3. Get all entities I follow
- Implement short-lived caching for 128k previews (30min)
