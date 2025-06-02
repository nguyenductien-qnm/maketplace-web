import { Route } from "react-router-dom"

function PublicRoutes() {
    <Route>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
    </Route>
}
export default PublicRoutes
