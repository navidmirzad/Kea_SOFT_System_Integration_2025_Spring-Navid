from datetime import datetime, timezone


print(datetime.now(timezone.utc).isoformat()) # UTC Standard: ISO 8601

print(datetime.now()) # Local date and time

print(datetime.fromtimestamp(0)) # Unix Epoch

# Danish date (dd-mm-yyyy)
danish_date = datetime.now().strftime("%d-%m-%Y")
print("Danish date:", danish_date)

# US date (mm/dd/yyyy)
us_date = datetime.now().strftime("%m/%d/%Y")
print("US date:", us_date)

print("Todays date:", datetime.today())
