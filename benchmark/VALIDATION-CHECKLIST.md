# Validation Checklist for Test Branch Setup

## Pre-Implementation Validation
- [ ] Confirmed current branch name matches expected: `git branch --show-current`
- [ ] Read the full branch documentation in `benchmark/branches/[branch]/[branch].md`
- [ ] Counted expected misalignments from Configuration section
- [ ] Made a mental/written list of all files to modify

## During Implementation

### For Type 1 (Missing) Changes
- [ ] Feature/code completely removed, not just commented out
- [ ] No leftover imports for removed features
- [ ] App doesn't crash due to missing dependencies

### For Type 2 (Incorrect) Changes  
- [ ] Changed exactly what was specified (e.g., 100→50, DESC→ASC)
- [ ] Didn't "fix" the incorrect implementation
- [ ] Change is genuinely wrong, not just different

### For Type 3 (Extraneous) Changes
- [ ] Added feature works (doesn't have to be perfect)
- [ ] Added feature is not mentioned anywhere in spec
- [ ] Didn't add more than specified

## Post-Implementation Validation

### Misalignment Count Verification
Run through this table and check off each implemented misalignment:

| Branch | Expected | Actual | Match? |
|--------|----------|--------|--------|
| control_perfect | 0 | ___ | [ ] |
| baseline_balanced | 8 | ___ | [ ] |
| type1_heavy | 8 | ___ | [ ] |
| type2_heavy | 8 | ___ | [ ] |
| subtle_only | 5 | ___ | [ ] |
| distributed | 7 | ___ | [ ] |

### App Functionality Check
```bash
# Quick test - should start without crashing
npm run dev
# Visit http://localhost:3000
# Try basic operations (may have bugs - that's expected)
# Ctrl+C to stop
```

- [ ] App starts without error
- [ ] Homepage loads
- [ ] Can navigate to at least some pages
- [ ] No build/compile errors

### File System Check
```bash
# Verify benchmark folder will be removed
ls -la benchmark/  # Should exist now
rm -rf benchmark/
ls -la benchmark/  # Should error "No such file or directory"
git status  # Should show benchmark/ deleted
```

- [ ] Benchmark folder successfully deleted
- [ ] No backup files created (*.bak, *.old)
- [ ] No commented code blocks added

### Git Status Check
```bash
git status
git diff --stat  # Shows summary of changes
```

- [ ] Only expected files modified
- [ ] No untracked files (except those intentionally added for Type 3)
- [ ] No changes to package.json or package-lock.json (unless specified)

## Final Commit Checklist

- [ ] All changes match branch documentation exactly
- [ ] Misalignment count is correct
- [ ] App runs (with intended bugs/missing features)
- [ ] Benchmark folder is deleted
- [ ] Commit message follows format: `test: Plant [branch_name] misalignments for benchmark testing`

## Red Flags - DO NOT COMMIT IF:
- ❌ App won't start at all (syntax errors, missing dependencies)
- ❌ Changed more files than specified
- ❌ Added helpful comments about what was changed
- ❌ Number of misalignments doesn't match expected
- ❌ Benchmark folder still exists
- ❌ Added console.log statements (unless specified for subtle_only)
- ❌ "Improved" something while making changes

## Branch-Specific Critical Checks

### control_perfect
- ⚠️ NO code changes should be made
- ⚠️ ONLY delete benchmark folder

### baseline_balanced  
- ⚠️ Statistics bar completely removed
- ⚠️ Admin page created and accessible

### type1_heavy
- ⚠️ middleware.ts file completely deleted
- ⚠️ logout route file completely deleted

### type2_heavy
- ⚠️ Using SHA256 not bcrypt (security issue intended)
- ⚠️ Checkbox affects ALL tasks (major bug intended)

### subtle_only
- ⚠️ Changes are subtle - double-check they're actually wrong
- ⚠️ Only 5 misalignments (not 6 - we removed one)

### distributed
- ⚠️ Each file has exactly ONE change
- ⚠️ Only 7 misalignments (not 8 - we removed one)

## If Something Goes Wrong

```bash
# Reset to clean state (ONLY if you need to start over)
git reset --hard HEAD
git clean -fd

# Then start the implementation again
```

## Success Criteria
✅ When you can check every box above, the branch is ready for testing!
