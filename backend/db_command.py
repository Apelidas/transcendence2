from transcendence.models.user import User

# Query all records in a model
all_records = User.objects.all()

# Print the records
for record in all_records:
    print(record)
