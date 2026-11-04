
const followModel = require('../models/follow.model');
const userModel = require('../models/user.model');

async function followUserController(req, res) {

    const followerid = req.user.id;
    const followeeid = req.params.userId;

    if (followerid == followeeid) {
        return res.status(400).json({
            message: 'You cannot follow yourself'
        });
    }

    const isFolloweeExist = await userModel.findById(followeeid);

    if (!isFolloweeExist) {
        return res.status(404).json({
            message: 'User does not exist'
        });
    }

    const isAlreadyFollow = await followModel.findOne({
        follower: followerid,
        followee: followeeid
    });

    if (isAlreadyFollow) {
        return res.status(409).json({
            message: 'You are already following this user'
        });
    }

    const followRecord = await followModel.create({
        follower: followerid,
        followee: followeeid
    });

    return res.status(201).json({
        message: `You are now following ${followeeid}`,
        follow: followRecord
    });
}

async function unfollowUserController(req, res) {
    const followerid = req.user.id;
    const followeeid = req.params.userId;

    const isUserFollowing = await followModel.findOne({
        follower: followerid,
        followee: followeeid
    })
    if (!isUserFollowing) {
        return res.status(400).json({
            message: 'you does not follow this user'
        })
    }

    await followModel.findByIdAndDelete(isUserFollowing._id)

    res.status(200).json({
        message: 'you have unfollow'
    })


}

async function upadatefollowrequestController(req, res) {
    const { status } = req.body;
    const userId = req.user.id;
    const followId = req.params.followId;

    
    const followrequest = await followModel.findOneAndUpdate(
        {
            _id: followId,
            followee: userId,
            status: 'pending'
        },
        {
            status: status
        },
        {
            new: true,
            runValidators: true
        }
    );

    if (!followrequest) {
        return res.status(404).json({
            message: 'Follow request not found'
        });
    }

    return res.status(200).json({
        message: `Follow request ${status}`,
        follow: followrequest
    });
}

module.exports = {
    followUserController, unfollowUserController, upadatefollowrequestController
};
