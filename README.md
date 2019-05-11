# person v1

This API is authoritative for RPI Ambulance member data. Data is ingested from G Suite and our [training application](https://github.com/rpiambulance/training) (well, not right now, but once that's built out) and provided to services that need it.

### Usage

All requests must be accompanied by a query string: `?token=<token>`.

- `/get/users`\
  Provides all members' full data
- `/get/user/<identifier>`\
  Provides data only for the member associated with that `identifier`. Per Google's documentation:

  > The value can be the user's primary email address, alias email address, or unique user ID.

### Configuration

A Google service account is used to query their APIs. Request the private key file in JSON format, and place it in `/keys` name as `person-api.json`.

## Credits:

### Developers:

- [Dan Bruce](https://github.com/ddbruce)

### License

person-v1 is provided under the [MIT License](https://opensource.org/licenses/MIT).

### Contact

For any question, comments, or concerns, email [dev@rpiambulance.com](dev@rpiambulance.com), [create an issue](https://github.com/rpiambulance/person-v1/issues/new), or open up a pull request.
