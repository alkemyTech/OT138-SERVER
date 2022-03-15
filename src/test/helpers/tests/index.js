export const testIfNotLogged = (res) => {
    errorFlag(res, "AUT001", "401");
}

export const testIfNotAdmin = (res) => {
    errorFlag(res, "AUT002", "403");
}

export const testIfBodyValidationError = (res) => {
    errorFlag(res, "VAL001", "400");
}

export const testIfNoResults = (res) => {
    errorFlag(res, "REQ001", "404");
}

export const testIfParamsValidationError = (res) => {
    errorFlag(res, "REQ002", "400");
}

export const testIfSuccess = (res) => {
    it("should return an success response object if no error", async () => {
        res.should.be.a('object');
        res.status.should.be.equal(200);
        res.body.should.have.property("error");
        res.body.should.have.property("status");
        res.body.error.should.be.equal(false);
    })
}

export const errorFlag = (res, errorCode, status) => {
    res.should.be.a('object');
    res.status.should.be.equal(200);
    res.body.should.have.property("error");
    res.body.should.have.property("errorCode");
    res.body.should.have.property("status");
    res.body.error.should.be.equal(true);
    res.body.errorCode.should.be.equal(errorCode);
    res.body.status.should.be.equal(status);
    res.body.message.should.be.a('string');
}