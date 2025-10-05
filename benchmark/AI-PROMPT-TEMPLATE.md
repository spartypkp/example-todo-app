# AI Prompt Template

## Copy and paste this prompt when you're ready to implement a branch:

---

I'm on the `[BRANCH_NAME]` branch of a TODO app that needs specific misalignments planted for benchmark testing.

Please:
1. Read `/benchmark/AI-IMPLEMENTATION-GUIDE.md` for general instructions
2. Read `/benchmark/branches/[BRANCH_NAME]/[BRANCH_NAME].md` for specific requirements
3. Implement ALL misalignments exactly as specified
4. Test that the app still runs with `npm run dev`
5. Delete the entire `/benchmark` folder
6. Commit with message: `test: Plant [BRANCH_NAME] misalignments for benchmark testing`

Use the `/benchmark/VALIDATION-CHECKLIST.md` to verify everything is correct before the final commit.

The current branch should have [N] total misalignments:
- control_perfect: 0 (NO CHANGES)
- baseline_balanced: 8
- type1_heavy: 8  
- type2_heavy: 8
- subtle_only: 5
- distributed: 7

Please proceed with implementing the misalignments for this branch.

---

## Alternative Shorter Prompt:

---

Implement test misalignments for `[BRANCH_NAME]` branch:
1. Follow `/benchmark/branches/[BRANCH_NAME]/[BRANCH_NAME].md`
2. Make exactly [N] misalignments
3. Delete `/benchmark` folder
4. Commit: `test: Plant [BRANCH_NAME] misalignments for benchmark testing`

---

## For control_perfect branch specifically:

---

I'm on the `control_perfect` branch. This is the control test with ZERO misalignments.

Please:
1. Make NO code changes
2. Only delete the `/benchmark` folder  
3. Commit with message: `test: Control branch - perfect alignment (no changes)`

This tests false positives on perfectly aligned code.

---
