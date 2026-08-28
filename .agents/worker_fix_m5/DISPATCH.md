## 2026-08-28T10:50:58Z

You are Worker Fix for the Travelio React + Vite web application task.
Your working directory: c:\Users\GLYTSHU\Desktop\MuseSpark\.agents\worker_fix_m5
Original request path: c:\Users\GLYTSHU\Desktop\MuseSpark\.agents\ORIGINAL_REQUEST.md
Reviewer 2 feedback path: c:\Users\GLYTSHU\Desktop\MuseSpark\.agents\reviewer_2\handoff.md
Target app directory: c:\Users\GLYTSHU\Desktop\MuseSpark\travelio_vite_app

Remediation Tasks (per Reviewer 2 handoff report):
1. Fix TypeScript compilation errors in test files:
   - `src/test/adversarial/ModalFormAdversarial.test.tsx`: remove unused imports (`within`, `act`, `userEvent`, `tourB`, `incrementBtn`).
   - `src/test/adversarial/SearchFilterAdversarial.test.tsx`: remove unused imports (`fireEvent`, `SearchBar`, `CategoryGrid`, `Tour`).
2. Fix `package.json` lint script and `vite.config.ts`:
   - Update `"lint": "tsc -b"` in `package.json`.
   - In `vite.config.ts`, ensure `test: { testTimeout: 15000, ... }` is configured to prevent JSDOM timeouts during long workflows.
3. Create `public/` directory with `favicon.svg`:
   - Create `travelio_vite_app/public/favicon.svg` with a clean SVG compass/travel icon.
4. Fix type annotation in `BookingForm.tsx`:
   - `src/components/Modal/BookingForm.tsx:130`: replace `value: any` with strict type `PlanTripFormData[keyof PlanTripFormData] | string | number | undefined`.
5. Fix test assertions in `src/test/e2e/E2EWorkflows.test.tsx` and `src/test/adversarial/SearchFilterAdversarial.test.tsx`:
   - Resolve button query ambiguity in `SearchFilterAdversarial.test.tsx` for `/reset filters/i` (use specific container queries or `getAllByRole(...)[0]`).
   - Ensure duration filter assertions in `SearchFilterAdversarial.test.tsx` match the duration category logic in `useTourFilter.ts`.
   - Ensure `E2EWorkflows.test.tsx` workflows (Mobile drawer flow, Newsletter VIP welcome) pass deterministically without timing out.
6. Verify full build and test execution:
   - Run `npm run lint` (`tsc -b`) -> must exit with 0 errors.
   - Run `npm run build` (`tsc -b && vite build`) -> must exit with 0 errors.
   - Run `npm test` -> all 18 test files (including unit, integration, E2E, and adversarial) must PASS with 100% pass rate.
7. Write your handoff to `c:\Users\GLYTSHU\Desktop\MuseSpark\.agents\worker_fix_m5\handoff.md` documenting commands and test results.
8. Send a message to parent when complete.
