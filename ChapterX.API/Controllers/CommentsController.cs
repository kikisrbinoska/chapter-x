using ChapterX.Application.Comment.Commands;
using ChapterX.Application.Comment.Queries;
using ChapterX.Domain.Repositories;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace ChapterX.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentsController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly ICommentRepository _commentRepository;
        private readonly ILogger<CommentsController> _logger;

        public CommentsController(IMediator mediator, ICommentRepository commentRepository, ILogger<CommentsController> logger)
        {
            _mediator = mediator;
            _commentRepository = commentRepository;
            _logger = logger;
        }

        [HttpGet("story/{storyId:int}")]
        [AllowAnonymous]
        public async Task<ActionResult> GetByStory(int storyId)
        {
            var comments = await _commentRepository.GetByStoryIdAsync(storyId);
            var result = comments.Select(c => new
            {
                id = c.Id,
                content = c.Content,
                userId = c.UserId,
                storyId = c.StoryId,
                username = c.User?.Username ?? "",
                createdAt = c.CreatedAt,
            });
            return Ok(result);
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult> GetAll()
        {
            _logger.LogInformation("Fetching all comments");
            var response = await _mediator.Send(new GetAllRequest());
            return Ok(response);
        }

        [HttpGet("{id:int}")]
        [AllowAnonymous]
        public async Task<ActionResult> GetById(int id)
        {
            _logger.LogInformation("Fetching comment with ID: {CommentId}", id);
            var response = await _mediator.Send(new GetRequest(id));
            return Ok(response);
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult> Add([FromBody] AddRequest request)
        {
            var callerId = int.Parse(User.FindFirstValue(JwtRegisteredClaimNames.Sub)!);
            _logger.LogInformation("Adding a new comment");
            var response = await _mediator.Send(request with { UserId = callerId });
            return Ok(response);
        }

        [HttpPut("{id:int}")]
        [Authorize]
        public async Task<ActionResult> Update(int id, [FromBody] UpdateRequest request)
        {
            _logger.LogInformation("Updating comment with ID: {CommentId}", id);
            if (id != request.Id)
            {
                return BadRequest("Route ID and body ID must match.");
            }

            var callerId = int.Parse(User.FindFirstValue(JwtRegisteredClaimNames.Sub)!);
            var response = await _mediator.Send(request with { CallerId = callerId });
            return Ok(response);
        }

        [HttpDelete("{id:int}")]
        [Authorize]
        public async Task<ActionResult> Delete(int id)
        {
            _logger.LogInformation("Deleting comment with ID: {CommentId}", id);
            var callerId = int.Parse(User.FindFirstValue(JwtRegisteredClaimNames.Sub)!);
            var response = await _mediator.Send(new DeleteRequest(id, callerId));
            return Ok(response);
        }
    }
}

