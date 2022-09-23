# TODO Soundfiend

## Frontend

:white_check_mark: Mock 3 different watches on sidebar
:white_check_mark: Mock Settings page (change username, show email)
:white_check_mark: Mock registration page (username, password, email)
:white_check_mark: Mock login page (username, password)
:white_check_mark: Mock Inbox
:white_check_mark: Draw search/sort for watches/inbox
:white_check_mark: Remake accordion with custom collapse / custom accordion => decrease padding
:white_large_square: Find out which elements need keys
:white_check_mark: Configure index page (set it to be inbox)
:white_check_mark: Implement custom validation (required fields are filled & password/repeat password match) (https://felixgerschau.com/react-hooks-form-validation-typescript/)
:white_check_mark: Mock registration successful page (after validation went through)
:white_large_square: Implement switching between tracks
:white_large_square: Listen for arrow left/right key presses to navigate on track (+/- 10 sec back/forth)

## Backend

:white_large_square: Implement back end form validation
:white_large_square: Install and configure postfix (locally) --> https://docs.gitlab.com/ee/administration/reply_by_email_postfix_setup.html
:white_large_square: Install and configure PostgreSQL (locally)
:white_large_square: Configure / create virtual users for Postfix
:white_large_square: Registration logic:

1. Create new user in users database
2. Create new virtual user in emails database
3. Expose API for:
   a. Get all new releases
   b. Get all new unseen releases
   c. Get all entities I follow

:white_large_square: Implement short-lived caching for 128k previews (30min after user have clicked listen)

# Flows

Click on release => Load data => Show spinner/loading/whatever => Show decsription and music
