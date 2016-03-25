Azure Active Directory Application Roles

Azure Active Directory (Azure AD) is Microsoft’s cloud based directory, offering comprehensive identity and access management solution that provides a robust set of capabilities to manage users and groups.
Application developers and software-as-a-service (SaaS) providers can develop cloud services or line of business applications (LoB) that can be integrated with Azure Active Directory (Azure AD) to provide secure sign in (authentication) and authorization (role/group based) for their services.

The Azure AD offers ability for developers to declare a set of roles as part of the application registration in Azure AD. Once the roles are declared, when a customer admin assigns users/groups to the application in the Azure management portal, they select which application role the user/group is assigned to. Once a user is assigned to an application role (either through a direct assignment or via an assignment to a group that the user is member of), Azure AD includes the roles claim in the token when the user signs in to the application. The application can then authorize the user using constructs like IsInRole("writer") or the [Authorize (Roles="Editor")] attribute.

To integrate an application or service with Azure AD, a developer must first register the details about their application with Azure AD through the Azure portal.
 
