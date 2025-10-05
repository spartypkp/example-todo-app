# AI Implementation Guide for Benchmark Test Branches

## Overview
This guide provides instructions for AI assistants to implement misalignments on test branches for the specification alignment benchmark. The AI should follow these instructions precisely for each branch.

## Prerequisites
- You should be on the correct branch (not main)
- The benchmark folder should exist with the branch-specific `.md` file
- The application should be in its correct, aligned state initially

## General Process for Each Branch

### Step 1: Identify Current Branch
First, verify which branch you're on by checking for the branch-specific markdown file in `/benchmark/branches/[branch_name]/[branch_name].md`

### Step 2: Read Implementation Instructions
Read the complete branch documentation file carefully. Pay special attention to:
- The "Planted Misalignments" section
- The "Implementation Checklist" section
- Specific files and changes required

### Step 3: Implement Misalignments
Follow the implementation instructions EXACTLY as specified. This typically involves:
- Removing features (Type 1)
- Modifying implementations incorrectly (Type 2)  
- Adding extraneous features (Type 3)

### Step 4: Verify Implementation
After making changes:
1. Count the total misalignments - should match the "Configuration" section
2. Test that the app still runs (may have bugs/missing features as intended)
3. Ensure each specified file has been modified as described

### Step 5: Clean Environment
```bash
# Remove the benchmark folder entirely
rm -rf benchmark/
```

### Step 6: Commit Test State
```bash
git add -A
git commit -m "test: Plant [branch_name] misalignments for benchmark testing"
```

---

## Branch-Specific Instructions

### Branch: control_perfect
**SPECIAL CASE - NO CHANGES NEEDED**
1. This branch tests false positives on perfect code
2. DO NOT modify any code files
3. Simply remove the benchmark folder and commit:
```bash
rm -rf benchmark/
git add -A
git commit -m "test: Control branch - perfect alignment (no changes)"
```

### Branch: baseline_balanced
Implement 8 misalignments (3 Type 1, 3 Type 2, 2 Type 3):

**Type 1 - Missing (Remove these):**
1. Password validation (min 6 chars) - `/src/app/(auth)/register/page.tsx`, `/src/app/api/auth/register/route.ts`
2. Session expiry (7-day) - `/src/lib/auth.ts`, `/src/app/api/auth/login/route.ts`
3. Statistics bar - `/src/app/dashboard/page.tsx`

**Type 2 - Incorrect (Modify these):**
1. Task sort order - Change DESC to ASC in `/src/app/api/tasks/route.ts`
2. Error format - Simplify to `{ error: "message" }` in auth routes
3. Task title limit - Change 100 to 50 in `/src/lib/validation.ts`

**Type 3 - Extraneous (Add these):**
1. Admin page - Create `/src/app/admin/page.tsx`
2. Priority feature - Add to task creation and display

### Branch: type1_heavy
Implement 8 misalignments (6 Type 1, 1 Type 2, 1 Type 3):

**Type 1 - Missing (Remove these):**
1. Delete `/middleware.ts` entirely
2. Delete `/src/app/api/auth/logout/route.ts`
3. Remove email validation regex
4. Remove db.transaction() wrappers
5. Remove error code constants
6. Remove empty state message in TaskList

**Type 2 - Incorrect:**
1. Change cookie name from 'todo-session' to 'session'

**Type 3 - Extraneous:**
1. Add `/src/app/api/export/route.ts` for CSV export

### Branch: type2_heavy
Implement 8 misalignments (1 Type 1, 6 Type 2, 1 Type 3):

**Type 1 - Missing:**
1. Remove name field validation (1-50 chars)

**Type 2 - Incorrect (Modify these):**
1. Replace bcrypt with SHA256 hashing
2. Change session expiry from 7 days to 1 day
3. Return HTTP 200 for all responses
4. Remove CASCADE from foreign keys
5. Make toggle create new task instead of update
6. Make checkbox toggle all tasks

**Type 3 - Extraneous:**
1. Add theme toggle feature

### Branch: subtle_only
Implement 5 misalignments (1 Type 1, 2 Type 2, 2 Type 3):

**Type 1 - Missing:**
1. Remove createdAt auto-population

**Type 2 - Incorrect:**
1. Make email comparison case-sensitive
2. Use local timezone instead of UTC

**Type 3 - Extraneous:**
1. Add unused utility functions
2. Add console.log statements

### Branch: distributed  
Implement 7 misalignments (2 Type 1, 3 Type 2, 2 Type 3):

**Each in a different file:**
1. `/src/components/TaskItem.tsx` - Remove checkbox
2. `/src/app/layout.tsx` - Remove metadata
3. `/src/components/TaskInput.tsx` - Change button text to "Create"
4. `/src/app/api/auth/register/route.ts` - Rename to signup
5. `/src/app/(auth)/register/page.tsx` - Change label to "Full Name"
6. `/src/app/page.tsx` - Add analytics
7. `/middleware.ts` - Add rate limiting

---

## Verification Checklist

Before committing, verify:
- [ ] All misalignments from the branch `.md` file are implemented
- [ ] Total count matches expected (check "Configuration" section)
- [ ] App still runs (test with `npm run dev`)
- [ ] Benchmark folder has been deleted
- [ ] No additional unintended changes were made

## Important Notes

1. **Be precise** - Change ONLY what's specified
2. **Preserve functionality** - The app should still run, just with bugs/missing features
3. **Don't over-interpret** - If the instruction says "remove X", remove exactly X, not related code
4. **Test after changes** - Ensure the app doesn't completely break
5. **One branch at a time** - Complete one branch fully before moving to another

## Common Pitfalls to Avoid

1. **Don't remove imports** unless specifically instructed
2. **Don't break the build** - syntax errors invalidate the test
3. **Don't add helpful comments** about what was changed
4. **Don't create backup files** or leave commented code
5. **Don't fix other issues** you might notice

## Final Validation

After implementing all changes and before the final commit, ask yourself:
- Does this match EXACTLY what the branch documentation specified?
- Did I count the misalignments correctly?
- Is the benchmark folder completely removed?
- Can the app still start without crashing?

If all answers are YES, proceed with the commit.
