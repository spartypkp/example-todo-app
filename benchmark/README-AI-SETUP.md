# AI-Assisted Branch Setup Guide

## Overview
This guide explains how to use AI assistance to set up test branches for the specification alignment benchmark.

## Documents in This Folder

1. **AI-IMPLEMENTATION-GUIDE.md** - Comprehensive instructions for implementing each branch
2. **QUICK-REFERENCE.md** - Quick lookup table and key information  
3. **VALIDATION-CHECKLIST.md** - Step-by-step validation before committing
4. **AI-PROMPT-TEMPLATE.md** - Copy-paste prompts for AI assistance
5. **README-AI-SETUP.md** - This file

## Workflow for Each Branch

### Step 1: Create and Switch Branch (Manual)
```bash
git checkout -b [branch_name] main
```

### Step 2: Start AI Session
Open your AI assistant (Cursor, Claude, etc.) and paste the appropriate prompt from `AI-PROMPT-TEMPLATE.md`

### Step 3: AI Implementation
The AI will:
- Read the branch-specific instructions
- Implement all misalignments
- Test the app
- Delete the benchmark folder
- Create the final commit

### Step 4: Verify
You should verify the AI's work:
```bash
git log -1  # Check commit message
git diff HEAD~1 --stat  # Review changed files
npm run dev  # Test app still runs
```

### Step 5: Push Branch
```bash
git push origin [branch_name]
```

## Order of Implementation

Follow this specific order (control_perfect MUST be first):

1. **control_perfect** ← Start here (no changes, just delete benchmark)
2. **baseline_balanced** (8 misalignments)
3. **type1_heavy** (8 misalignments)
4. **type2_heavy** (8 misalignments)
5. **subtle_only** (5 misalignments)
6. **distributed** (7 misalignments)

## Tips for Working with AI

### DO:
- ✅ Give AI the full context by referencing the guide files
- ✅ Let AI read the branch-specific `.md` file
- ✅ Ask AI to validate using the checklist
- ✅ Have AI test the app before committing

### DON'T:
- ❌ Let AI make "improvements" while implementing
- ❌ Skip the validation checklist
- ❌ Let AI commit if the app won't run
- ❌ Work on multiple branches simultaneously

## Troubleshooting

### If AI makes a mistake:
```bash
# Reset the branch
git reset --hard main
# Try again with clearer instructions
```

### If app won't run after changes:
- Check for syntax errors
- Ensure imports weren't accidentally removed
- Verify the changes match the specification

### If misalignment count is wrong:
- Re-read the branch `.md` file
- Count each change carefully
- Remember: subtle_only has 5 (not 6), distributed has 7 (not 8)

## Quality Assurance

Before moving to the next branch, ensure:
- [ ] Commit message is correct
- [ ] App runs (with intended bugs)
- [ ] Benchmark folder is gone
- [ ] Misalignment count matches expected
- [ ] No extra files or changes

## Final Notes

- This is a scientific benchmark - precision matters
- Each branch becomes a test environment frozen in time
- The AI should change ONLY what's specified
- When in doubt, refer to the branch-specific `.md` file

Good luck with your benchmark testing!
