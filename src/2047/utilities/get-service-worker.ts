"use strict";

export function getServiceWorker(registration: ServiceWorkerRegistration): ServiceWorker
{
    if (registration.installing)
    {
        return registration.installing;
    }
    else if (registration.waiting)
    {
        return registration.waiting;
    }
    else if (registration.active)
    {
        return registration.active;
    }
    else
    {
        return null;
    }
}
