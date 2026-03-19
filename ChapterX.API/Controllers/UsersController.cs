using ChapterX.Application.User.Commands;
using ChapterX.Application.User.Queries;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace ChapterX.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly ILogger<UsersController> _logger;

        public UsersController(IMediator mediator, ILogger<UsersController> logger)
        {
            _mediator = mediator;
            _logger = logger;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult> GetAll()
        {
            _logger.LogInformation("Fetching all users");
            var response = await _mediator.Send(new GetAllRequest());
            return Ok(response);
        }

        [HttpGet("{id:int}")]
        [AllowAnonymous]
        public async Task<ActionResult> GetById(int id)
        {
            _logger.LogInformation("Fetching user with ID: {UserId}", id);
            var response = await _mediator.Send(new GetRequest(id));
            return Ok(response);
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult> Add([FromBody] AddRequest request)
        {
            _logger.LogInformation("Adding a new user with username: {Username}", request.Username);
            var response = await _mediator.Send(request);
            return Ok(response);
        }

        [HttpPut("{id:int}")]
        [Authorize]
        public async Task<ActionResult> Update(int id, [FromBody] UpdateRequest request)
        {
            _logger.LogInformation("Updating user with ID: {UserId}", id);
            if (id != request.Id)
            {
                return BadRequest("Route ID and body ID must match.");
            }

            var response = await _mediator.Send(request);
            return Ok(response);
        }

        [HttpDelete("{id:int}")]
        [Authorize]
        public async Task<ActionResult> Delete(int id)
        {
            _logger.LogInformation("Deleting user with ID: {UserId}", id);
            var response = await _mediator.Send(new DeleteRequest(id));
            return Ok(response);
        }
    }
}

