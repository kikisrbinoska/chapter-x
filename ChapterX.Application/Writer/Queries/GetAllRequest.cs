using MediatR;

namespace ChapterX.Application.Writer.Queries
{
    public record GetAllRequest() : IRequest<GetAllResponse>;
}
