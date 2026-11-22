# nodejs-cron

A minimal Node.js job for running on a schedule. Each run prints a few messages and exits with code 0. It has no dependencies.

## Run locally

```bash
node index.js
```

## Docker

```bash
docker build -t nodejs-cron .
docker run --rm nodejs-cron
```

## Config (env vars)

| Var        | Default           | Purpose                       |
|------------|-------------------|-------------------------------|
| `JOB_NAME` | `sample-cron-job` | Label printed on every line   |
| `STEPS`    | `3`               | Number of 1-second work steps |

```bash
docker run --rm -e JOB_NAME=nightly -e STEPS=5 nodejs-cron
```

## Schedule it

Host crontab (every 5 minutes):

```
*/5 * * * * docker run --rm nodejs-cron >> /var/log/nodejs-cron.log 2>&1
```

Kubernetes CronJob:

```yaml
apiVersion: batch/v1
kind: CronJob
metadata:
  name: nodejs-cron
spec:
  schedule: "*/5 * * * *"
  jobTemplate:
    spec:
      template:
        spec:
          restartPolicy: Never
          containers:
            - name: nodejs-cron
              image: nodejs-cron:latest
```
