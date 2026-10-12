# CRM Lite rollout

This change preserves the existing email recipients and adds durable private inquiry capture before acknowledging a successful submission. The scheduled retry endpoint drains saved work every five minutes. Browser retries reuse a submission ID. Preview deployments never write storage, send email or SMS, or call the CRM.

## Production activation

1. Connect the dedicated private inquiry Blob store to this Vercel project for production. Set `INQUIRY_BLOB_STORE_ID` to that store. The SDK uses Vercel OIDC for the connected project. Do not replace Lucas's existing public image store or its `BLOB_STORE_ID`.
2. Issue the website's source token from its CRM Lite setup page. Install it as sensitive production-only `CRM_INTAKE_TOKEN`. Enable that source in CRM.
3. Set production-only `CRM_INTAKE_URL`, `CRM_INTAKE_SOURCE`, and sensitive `CRON_SECRET`. Keep `CRM_INTAKE_ENABLED=false` until the full configuration is verified.
4. Build the reviewed commit with `CRM_INTAKE_ENABLED=true`, verify the exact production deployment, and perform an explicitly authorized end-to-end inquiry test. Confirm the saved CRM inquiry and normal email receipt separately.
5. Leave SMS off until shared sender approval, complete recipient consent evidence, and an authorized delivered-and-confirmed text test.

## Failure handling

Unaccepted storage writes fail the form rather than reporting a lost inquiry as successful. Provider failures retain the private pending payload. Accepted email is not resent while CRM recovers. An ambiguous email older than 23 hours is retained for review instead of risking a duplicate after the provider idempotency window expires. Logs report references and statuses without contact details. Completed records retain only a fingerprint and provider receipt.

Lucas's lighting visualizer saves the lead before rendering, waits up to three minutes for image email enrichment, and falls back to the saved lead if the render never finishes. The final email payload is frozen before its first provider attempt.

## Verification

`npm run test:inquiries` covers provider outages, duplicate submissions, changed payload conflicts, persistent storage failures, wrong destinations, preview isolation, delayed renders, late enrichment, scheduler authentication, and explicit private-store selection. `npx tsc --noEmit` and production builds validate integration.
