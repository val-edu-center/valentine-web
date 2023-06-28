import Roles from "../model/Roles"

export const STAFF_ROLE = 'Staff'
export const DIRECTOR_ROLE = 'Director'
export const CLUB_ROLE = 'Club'
const CADET_ROLE = 'Cadet'
const PREP_ROLE = 'Prep'
const JUNIOR_ROLE = 'Junior'
const INTERMEDIATE_ROLE = 'Intermediate'
const TEEN_ROLE = 'Teen'
const BANKER_ROLE = 'Banker'
const DESIGNER_ROLE = '3D Designer'
const PRINTER_ROLE = '3D Printer'
export const roleGroups = [CADET_ROLE, PREP_ROLE, JUNIOR_ROLE, INTERMEDIATE_ROLE, TEEN_ROLE, STAFF_ROLE, DIRECTOR_ROLE, CLUB_ROLE]

export function getRoles(roleArray) {
    const roles = new Roles
    if (!roleArray) return roles
    if (isDirector(roleArray)) {
        roles.isDirector = true
    }
    else if (isStaff(roleArray)) {
        roles.isStaff = true
    }
    else if (isTeen(roleArray)) {
        roles.isTeen = true
    }
    else if (isIntermediate(roleArray)) {
        roles.isIntermeidate = true
    }
    else if (isJunior(roleArray)) {
        roles.isJunior = true
    }
    else if (isPrep(roleArray)) {
        roles.isPrep = true
    }
    else if (isCadet(roleArray)) {
        roles.isCadet = true
    }
    else if (isClub(roleArray)) {
        roles.isClub = true
    }
    if (is3DClubDesigner(roleArray)) {
        roles.is3DClubDesigner = true
    }
    if (is3DClubPrinter(roleArray)) {
        roles.is3DClubPrinter = true
    }
    if (isBanker(roleArray)) {
        roles.isBanker = true
    }
    return roles
}

export function getGroupRole(roleArray) {
    if (!roleArray) return null
    if (isDirector(roleArray)) {
        return DIRECTOR_ROLE
    }
    else if (isStaff(roleArray)) {
        return STAFF_ROLE
    }
    else if (isTeen(roleArray)) {
        return TEEN_ROLE
    }
    else if (isIntermediate(roleArray)) {
        return INTERMEDIATE_ROLE
    }
    else if (isJunior(roleArray)) {
        return JUNIOR_ROLE
    }
    else if (isPrep(roleArray)) {
        return PREP_ROLE
    }
    else if (isCadet(roleArray)) {
        return CADET_ROLE
    }
    else if (isClub(roleArray)) {
        return CLUB_ROLE
    }
    else {
        return undefined
    }
}

function isDirector(roleArray) {
    return roleArray.includes(DIRECTOR_ROLE)
}

function isStaff(roleArray) {
    return roleArray.includes(STAFF_ROLE)
}

function isTeen(roleArray) {
    return roleArray.includes(TEEN_ROLE)
}

function isIntermediate(roleArray) {
    return roleArray.includes(INTERMEDIATE_ROLE)
}

function isJunior(roleArray) {
    return roleArray.includes(JUNIOR_ROLE)
}

function isPrep(roleArray) {
    return roleArray.includes(PREP_ROLE)
}

function isCadet(roleArray) {
    return roleArray.includes(CADET_ROLE)
}

function isClub(roleArray) {
    return roleArray.includes(CLUB_ROLE)
}

function is3DClubDesigner(roleArray) {
    return roleArray.includes(DESIGNER_ROLE)
}

function is3DClubPrinter(roleArray) {
    return roleArray.includes(PRINTER_ROLE)
}

function isBanker(roleArray) {
    return roleArray.includes(BANKER_ROLE) || isStaff(roleArray) || isDirector(roleArray)
}