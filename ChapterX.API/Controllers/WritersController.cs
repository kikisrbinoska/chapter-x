using ChapterX.Application.Writer.Commands;
using ChapterX.Application.Writer.Queries;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace ChapterX.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WritersController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly ILogger<WritersController> _logger;

        public WritersController(IMediator mediator, ILogger<WritersController> logger)
        {
            _mediator = mediator;
            _logger = logger;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult> GetAll()
        {
            _logger.LogInformation("Fetching all writers");
            var response = await _mediator.Send(new GetAllRequest());
            return Ok(response);
        }

        [HttpGet("{id:int}")]
        [AllowAnonymous]
        public async Task<ActionResult> GetById(int id)
        {
            _logger.LogInformation("Fetching writer with ID: {WriterId}", id);
            var response = await _mediator.Send(new GetRequest(id));
            return Ok(response);
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult> Add([FromBody] AddRequest request)
        {
            _logger.LogInformation("Adding a new writer");
            var response = await _mediator.Send(request);
            return Ok(response);
        }

        [HttpPut("{id:int}")]
        [Authorize]
        public async Task<ActionResult> Update(int id, [FromBody] UpdateRequest request)
        {
            _logger.LogInformation("Updating writer with ID: {WriterId}", id);
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
            _logger.LogInformation("Deleting writer with ID: {WriterId}", id);
            var response = await _mediator.Send(new DeleteRequest(id));
            return Ok(response);
        }
    }
}

