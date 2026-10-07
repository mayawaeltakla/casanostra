# CASANOSTRA — Asset Manifest

## Final service image naming contract

These are the intended filenames for the 11 service images:

| Service slug | Filename | Status |
|---|---|---|
| reservations-turkey | `reservations-turkey.jpg` | APPROVED / INBOX |
| visa | `visa.jpg` | FINAL IMAGE STILL NEEDS OWNER UPLOAD/CONFIRMATION |
| vip-cars | `vip-cars.jpg` | FINAL IMAGE STILL NEEDS OWNER UPLOAD/CONFIRMATION |
| hotels | `hotels.jpg` | APPROVED / INBOX |
| flights | `flights.jpg` | APPROVED / INBOX |
| daily-tours | `daily-tours.jpg` | APPROVED / INBOX |
| private-tours | `private-tours.jpg` | APPROVED / INBOX |
| group-tours | `group-tours.jpg` | FINAL IMAGE STILL NEEDS OWNER UPLOAD/CONFIRMATION |
| hajj-umrah | `hajj-umrah.jpg` | APPROVED / INBOX |
| medical-tourism | `medical-tourism.jpg` | FINAL IMAGE STILL NEEDS OWNER UPLOAD/CONFIRMATION |
| other-services | `other-services.jpg` | APPROVED / INBOX |

## Important

Do NOT treat filenames as proof that an image is final. The owner must confirm the final four image files before Codex performs image ingestion.

The current starter package intentionally does NOT include the previously rejected `visa`, portrait VIP-car, portrait group-tour, or portrait medical-tourism images as final assets.

## Target production organization

Preferred target after Codex audit:

```
public/images/services/<service-slug>/hero.jpg
```

But Codex must inspect the existing architecture first and must not create this structure blindly.

## Video preservation rule

`public/videos/**` is out of scope for image ingestion. Do not delete, move, replace, compress, rename, or rewrite any video/poster asset during the image task.
