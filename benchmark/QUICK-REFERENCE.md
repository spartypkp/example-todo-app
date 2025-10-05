# Quick Reference for Branch Implementation

## Workflow for AI
```bash
# 1. Verify branch (user will have already switched)
git branch --show-current

# 2. Read the specific instructions
cat benchmark/branches/[branch_name]/[branch_name].md

# 3. Implement misalignments
# [Make all the specified changes]

# 4. Test app still runs
npm run dev  # Quick test, then Ctrl+C

# 5. Clean up
rm -rf benchmark/

# 6. Commit
git add -A
git commit -m "test: Plant [branch_name] misalignments for benchmark testing"
```

## Branch Summary Table

| Branch | Total | Type1 | Type2 | Type3 | Key Focus |
|--------|-------|-------|-------|-------|-----------|
| control_perfect | 0 | 0 | 0 | 0 | NO CHANGES - Test false positives |
| baseline_balanced | 8 | 3 | 3 | 2 | Balanced mix |
| type1_heavy | 8 | 6 | 1 | 1 | Missing implementations |
| type2_heavy | 8 | 1 | 6 | 1 | Incorrect implementations |
| subtle_only | 5 | 1 | 2 | 2 | Hard-to-detect issues |
| distributed | 7 | 2 | 3 | 2 | Spread across many files |

## Key Files Often Modified

### Authentication
- `/src/app/(auth)/register/page.tsx` - Registration form
- `/src/app/(auth)/login/page.tsx` - Login form
- `/src/app/api/auth/register/route.ts` - Register endpoint
- `/src/app/api/auth/login/route.ts` - Login endpoint
- `/src/app/api/auth/logout/route.ts` - Logout endpoint
- `/src/lib/auth.ts` - Auth utilities

### Tasks
- `/src/app/api/tasks/route.ts` - Task CRUD
- `/src/app/api/tasks/[id]/route.ts` - Single task operations
- `/src/components/TaskList.tsx` - Task display
- `/src/components/TaskItem.tsx` - Individual task
- `/src/components/TaskInput.tsx` - New task input

### Core
- `/src/lib/db.ts` - Database setup
- `/src/lib/validation.ts` - Input validation
- `/middleware.ts` - Route protection
- `/src/app/layout.tsx` - Root layout
- `/src/app/dashboard/page.tsx` - Main dashboard

## Type Classifications

### Type 1: Missing (Not Implemented)
- Delete files
- Remove functions
- Remove validation
- Remove features

### Type 2: Incorrect (Wrong Implementation)  
- Wrong values (50 vs 100)
- Wrong direction (ASC vs DESC)
- Wrong algorithm (SHA256 vs bcrypt)
- Wrong behavior (create vs update)

### Type 3: Extraneous (Not in Spec)
- Add new pages
- Add new features
- Add new fields
- Add unnecessary code

## Commit Message Format
```
test: Plant [branch_name] misalignments for benchmark testing
```

## Remember
- ONE branch at a time
- EXACT changes only
- App must still RUN
- DELETE benchmark folder
- COMMIT when done
