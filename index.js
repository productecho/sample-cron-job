#!/usr/bin/env node
/**
 * Simple one-shot cron job.
 *
 * The scheduler (cron, Kubernetes CronJob, ECS scheduled task, etc.) starts
 * this container; it prints some messages, does its work, and exits.
 * Exit code 0 = success, non-zero = failure.
 */

const JOB_NAME = process.env.JOB_NAME || "sample-cron-job";
const STEPS = Number(process.env.STEPS || 3);

const log = (msg) => console.log(`[${new Date().toISOString()}] [${JOB_NAME}] ${msg}`);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function run() {
  for (let i = 1; i <= STEPS; i++) {
    log(`Working... step ${i}/${STEPS}`);
    await sleep(1000);
  }
}

async function main() {
  const started = Date.now();
  log("Job started");

  try {
    await run();
    log(`Job finished successfully in ${((Date.now() - started) / 1000).toFixed(1)}s`);
    process.exit(0);
  } catch (err) {
    console.error(`[${new Date().toISOString()}] [${JOB_NAME}] Job failed:`, err);
    process.exit(1);
  }
}

main();
