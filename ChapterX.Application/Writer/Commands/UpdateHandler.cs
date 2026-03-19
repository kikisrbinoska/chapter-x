using ChapterX.Domain.Repositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace ChapterX.Application.Writer.Commands
{
    public class UpdateHandler : IRequestHandler<UpdateRequest, UpdateResponse>
    {
        private readonly IWriterRepository _writerRepository;
        private readonly ILogger<UpdateHandler> _logger;

        public UpdateHandler(IWriterRepository writerRepository, ILogger<UpdateHandler> logger)
        {
            _writerRepository = writerRepository;
            _logger = logger;
        }

        public async Task<UpdateResponse> Handle(UpdateRequest request, CancellationToken cancellationToken)
        {
            var writer = await _writerRepository.GetByIdAsync(request.Id, cancellationToken);
            if (writer is null)
                return new UpdateResponse(false);

            // No updatable fields on Writer entity

            await _writerRepository.UpdateAsync(writer, cancellationToken);

            return new UpdateResponse(true);
        }
    }
}
