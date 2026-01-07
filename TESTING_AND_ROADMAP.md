# Testing & Feature Roadmap

## Testing the MVP

### Core Functionality
- [ ] Add/edit/delete roles - does data save correctly?
- [ ] Edit your profile - does the photo upload work?
- [ ] Do the aggregate totals (revenue, cash collected) update when you add/change roles?
- [ ] Refresh the page - does your data persist?
- [ ] Click "Share Resume" - copy the link, open it in a new incognito/private window. Does it display correctly?

### Edge Cases
- [ ] What happens with very large numbers ($10,000,000+)?
- [ ] What happens with long company names or titles?
- [ ] Try entering invalid data (negative numbers, weird characters)
- [ ] Test the logo fetch - try real domains (salesforce.com, hubspot.com) and fake ones

### Mobile
- [ ] Shrink your browser window or open on your phone - is it usable?

---

## Questions to Ask Yourself

As you use it, notice what feels clunky:
- Is anything confusing?
- What's taking too many clicks?
- What info do recruiters actually want to see?

---

## Potential Future Features

### High Value (if there's interest)
- [ ] User accounts + database (so data isn't just in browser/URL)
- [ ] PDF export for traditional resume submissions
- [ ] Custom URL slugs (salesresume.com/john-smith vs encoded URL)

### Nice to Have
- [ ] Drag to reorder roles
- [ ] More metrics (close rate, avg deal size, quota attainment %)
- [ ] Charts/graphs showing performance over time
- [ ] Multiple resume versions for different industries

### Polish
- [ ] Better empty states and onboarding
- [ ] Input validation and error messages
- [ ] Loading states for logo fetching
