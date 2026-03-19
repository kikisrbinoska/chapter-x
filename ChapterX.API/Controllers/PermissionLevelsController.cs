using ChapterX.Application.PermissionLevel.Commands;
using ChapterX.Application.PermissionLevel.Queries;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace ChapterX.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PermissionLevelsController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly ILogger<PermissionLevelsController> _logger;

        public PermissionLevelsController(IMediator mediator, ILogger<PermissionLevelsController> logger)
        {
            _mediator = mediator;
            _logger = logger;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult> GetAll()
        {
            _logger.LogInformation("Fetching all permission levels");
            var response = await _mediator.Send(new GetAllRequest());
            return Ok(response);
        }

        [HttpGet("{id:int}")]
        [AllowAnonymous]
        public async Task<ActionResult> GetById(int id)
        {
            _logger.LogInformation("Fetching permission level with ID: {PermissionLevelId}", id);
            var response = await _mediator.Send(new GetRequest(id));
            return Ok(response);
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult> Add([FromBody] AddRequest request)
        {
            _logger.LogInformation("Adding a new permission level");
            var response = await _mediator.Send(request);
            return Ok(response);
        }

        [HttpPut("{id:int}")]
        [Authorize]
        public async Task<ActionResult> Update(int id, [FromBody] UpdateRequest request)
        {
            _logger.LogInformation("Updating permission level with ID: {PermissionLevelId}", id);
            if (id != request.Id)
            {
                return BadRequest("Route ID and body ID must match.");
            }

            var response = await _mediator.Send(request);
            return Ok(response);
        }

        [HttpDelete]
        [Authorize]
        public async Task<ActionResult> Delete([FromBody] DeleteRequest request)
        {
            _logger.LogInformation("Deleting a permission level");
            var response = await _mediator.Send(request);
            return Ok(response);
        }
    }
}

