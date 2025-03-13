# INFO: adding port won't work because it's using the host network directly
docker run --name inngest --network host -d inngest/inngest \
  inngest dev -u http://localhost:3000/api/inngest
