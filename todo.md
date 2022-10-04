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
:white_large_square: Mock registration successful page (after validation went through)
:white_check_mark: Implement switching between tracks
:white_check_mark: Implement shuffle/repeat/normal play mode
:white_check_mark: Listen for arrow left/right key presses to navigate on track (+/- 10 sec back/forth)
:white_large_square: Add pagination for Inbox/Watches
:white_check_mark: Don't show audio players for each individual track in Inbox/Watch, rather show track/artist name, length, play and buy button/ Play button will play selected track and load it into bottom player.
:white_large_square: Set static width for table with release tracks

## Backend

:white_large_square: Implement bandcamp scraper that will generate data in same format as data.json
:white_large_square: Implement back end form validation
:white_large_square: Implement registration
:white_large_square: Implement profile page first time parser
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

1. User registers
2. User logs in
3. User is offered bandcamper email that they should forward their Bandcamp email to
4. New email from Bandcamp arrives to bandcamper email
5. The URL is parsed (e.g. https://bvdub-affin.bandcamp.com/album/decades-on-divided-stars)
6. URL content has necessary information, it is parsed
7. Parsed information gets constructed into an object (IRelease containing ITrack's)
8. This object gets added to an array of all releases for this user

# TODO 2022-10-04
### Parsing
- If release with an `id` already exists in localforage database, establish the following rules:
   - If `availableTracks` value of `parsedRelease` is greater than that of `localforageRelease`, 
:white_check_mark: add missing tracks to `localforageRelease`'s tracks (don't forget to sort)
:white_check_mark: overwrite `localforageRelease`'s `availableTracks` with `parsedRelease`'s `availableTracks`
:white_check_mark: bump this release to the top of watches list
:white_check_mark: bump this release to the top of inbox list
- If release with an `id` doesn't exist in localforage database
:white_large_square: add it to localforage database
:white_large_square: bump it to the top of watches list
- Make sure that all parsed releases are sorted by release date in descending order, both at Inbox and Watch page
:white_check_mark: They are sorted like that because new release announcements will come to email in this way.

:white_large_square: Parse band name from data-band attribute of the same `<script>` tag that we use to parse data-tralbum attirbute value.
### Playback
:white_large_square: If track's `src` returns an error, use that track's `url` and update every track's `mp3Url`

### Visuals
:white_large_square: If release is a preorder, mark it with a pill
:white_large_square: Correctly show how many new watches are in sidebar
:white_large_square: Correctly show how many new releases are in Inbox / Watch

### Function
:white_large_square: Implement search watch (Sidebar)
:white_large_square: Implement search release (Inbox/Watch)