# Axios to axiosInstance Migration Guide

## Why Migrate?

**axiosInstance** (from `@/lib/axios`) provides:
1. ✅ **Automatic cookie handling** - Sends JWT cookies with every request
2. ✅ **401 error handling** - Auto-redirects to login with toast notification
3. ✅ **Centralized configuration** - One place to manage all API settings
4. ✅ **No need to repeat** `withCredentials: true` everywhere

## Migration Pattern

### Step 1: Replace Import
```javascript
// BEFORE
import axios from "axios";

// AFTER
import axiosInstance from "@/lib/axios";
```

### Step 2: Replace API Calls

```javascript
// BEFORE
axios.get(`${process.env.NEXT_PUBLIC_APP_URI}/getbrokers`, {
  withCredentials: true,
})

// AFTER
axiosInstance.get('/api/getbrokers')
```

```javascript
// BEFORE
axios.post(`${process.env.NEXT_PUBLIC_APP_URI}/addbroker`, data, {
  withCredentials: true,
  headers: { 'Content-Type': 'multipart/form-data' }
})

// AFTER
axiosInstance.post('/api/addbroker', data, {
  headers: { 'Content-Type': 'multipart/form-data' }
})
```

## Key Rules

1. **Always add `/api` prefix** to the endpoint path
2. **Remove** `${process.env.NEXT_PUBLIC_APP_URI}`
3. **Remove** `withCredentials: true` (already in axiosInstance)
4. **Keep** other options like headers, params, etc.

## Files That Need Migration

### ✅ Already Migrated
- [x] `src/hooks/properties/useProperties.ts`
- [x] `src/hooks/brokers/useBrokers.ts`
- [x] `src/hooks/properties/useVariables.ts`
- [x] `src/hooks/shared/useVendors.ts`
- [x] `src/hooks/shared/useAuth.ts`
- [x] `src/app/(pages)/admin/page.tsx`
- [x] `src/app/(pages)/dashboard/page.tsx`

### ⚠️ Need Migration (Component Files)
- [ ] `src/app/components/Sidebar.tsx`
- [ ] `src/app/components/Register.tsx`
- [ ] `src/app/components/RecentlyListed.tsx`
- [ ] `src/app/components/NumberBar.tsx`
- [ ] `src/app/components/Navigationbar.tsx`
- [ ] `src/app/components/FeaturedBrokers.tsx`
- [ ] `src/app/components/DesktopNav.tsx`
- [ ] `src/app/page.tsx`

### ⚠️ Need Migration (Page Files)
- [ ] `src/app/(pages)/wishlist/page.tsx`
- [ ] `src/app/(pages)/viewownerproperty/page.tsx`
- [ ] `src/app/(pages)/buyproperties/page.tsx`
- [ ] `src/app/(pages)/(settings)/variables/page.tsx`
- [ ] `src/app/(pages)/(settings)/company/page.tsx`
- [ ] `src/app/(pages)/(vendors)/viewvendors/page.tsx`
- [ ] `src/app/(pages)/(vendors)/vendorslist/page.tsx`
- [ ] `src/app/(pages)/(vendors)/addvendors/page.tsx`
- [ ] `src/app/(pages)/(properties)/viewproperties/page.tsx`
- [ ] `src/app/(pages)/(properties)/singleproperty/page.tsx`
- [ ] `src/app/(pages)/(properties)/removeproperties/page.tsx`
- [ ] `src/app/(pages)/(properties)/postproperty/page.tsx`
- [ ] `src/app/(pages)/(brokers)/viewbrokers/page.tsx`
- [ ] `src/app/(pages)/(brokers)/brokerslist/page.tsx`
- [ ] `src/app/(pages)/(brokers)/addbrokers/page.tsx`

## Common Endpoints to Update

| Old | New |
|-----|-----|
| `/getbrokers` | `/api/getbrokers` |
| `/addbroker` | `/api/addbroker` |
| `/getproperties` | `/api/getproperties` |
| `/addproperties` | `/api/addproperties` |
| `/getdashboardnumbers` | `/api/getdashboardnumbers` |
| `/getvariables` | `/api/getvariables` |
| `/getvendors` | `/api/getvendors` |
| `/adminlogin` | `/api/adminlogin` |

## Testing After Migration

1. Clear browser cookies
2. Login as admin
3. Check browser DevTools → Application → Cookies
4. Verify `authToken` cookie exists
5. Try protected actions (add/edit/delete)
6. Verify no 401 errors in console

## Benefits After Migration

✅ All API calls use cookies automatically  
✅ Unauthorized users redirected to login  
✅ Consistent error handling  
✅ Easier to maintain  
✅ No repeated configuration  
