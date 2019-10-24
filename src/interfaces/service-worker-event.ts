"use strict";

export interface ServiceWorkerEvent extends Event
{
    target: EventTarget & ServiceWorker;
}
